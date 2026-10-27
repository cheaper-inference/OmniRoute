import test, { mock } from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  makeMcpResp,
  makeMcpSseResp,
  makeMcpStreamFetch,
  MCP_MOCK_SESSION_ID,
  rpcSequence,
  type McpFetchCall,
} from "./helpers/mcpStreamMock.ts";

// ---- helpers ----

function makeResp(data: unknown, status = 200, extraHeaders: Record<string, string> = {}) {
  const headers = new Headers({ "content-type": "application/json", ...extraHeaders });
  const obj = {
    ok: status < 400,
    status,
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(JSON.stringify(data)),
    headers,
  };
  obj.json = obj.json.bind(obj);
  obj.text = obj.text.bind(obj);
  return obj;
}

// Only string writes are captured; binary writes are passed through because the
// node:test runner reports results over this process's stdout as binary frames.
async function captureStdout(fn: () => Promise<void>): Promise<string> {
  const chunks: string[] = [];
  const orig = process.stdout.write.bind(process.stdout);
  process.stdout.write = ((c: string | Uint8Array, ...rest: never[]) => {
    if (typeof c !== "string") return orig(c, ...rest);
    chunks.push(c);
    return true;
  }) as typeof process.stdout.write;
  try {
    await fn();
  } finally {
    process.stdout.write = orig;
  }
  return chunks.join("");
}

async function captureStdio(fn: () => Promise<void>): Promise<{ stdout: string; stderr: string }> {
  const err: string[] = [];
  const orig = process.stderr.write.bind(process.stderr);
  process.stderr.write = ((c: string | Uint8Array, ...rest: never[]) => {
    if (typeof c !== "string") return orig(c, ...rest);
    err.push(c);
    return true;
  }) as typeof process.stderr.write;
  try {
    const stdout = await captureStdout(fn);
    return { stdout, stderr: err.join("") };
  } finally {
    process.stderr.write = orig;
  }
}

async function withFetch<T>(fetchImpl: typeof globalThis.fetch, fn: () => Promise<T>): Promise<T> {
  const origFetch = globalThis.fetch;
  globalThis.fetch = fetchImpl;
  try {
    return await fn();
  } finally {
    globalThis.fetch = origFetch;
  }
}

function jsonRpcSse(id: JsonRpcId, payload: Record<string, unknown>) {
  return makeMcpSseResp({ jsonrpc: "2.0", id, ...payload });
}

type JsonRpcId = number | string | null | undefined;

const {
  runMcpCallCommand,
  resolveMcpCallTimeoutMs,
  resolveMcpCallTimeouts,
  DEFAULT_HANDSHAKE_TIMEOUT_MS,
  MAX_TIMEOUT_MS,
} = await import("../../bin/cli/commands/mcp.mjs");
const { mcpCallTool, SESSION_DELETE_TIMEOUT_MS, CANCEL_NOTIFY_TIMEOUT_MS } =
  await import("../../bin/cli/mcpClient.mjs");
const { apiFetch } = await import("../../bin/cli/api.mjs");
const { createProgram } = await import("../../bin/cli/program.mjs");

const LOCAL = { baseUrl: "http://localhost:20128" };

// ---- mcp call: handshake ----

test("mcp call on a sessionful server: initialize → initialized → tools/call → DELETE, all carrying the session id", async () => {
  const calls: McpFetchCall[] = [];
  const out = await withFetch(makeMcpStreamFetch({ calls }), () =>
    captureStdout(async () => {
      const exitCode = await runMcpCallCommand("omniroute_get_health", { key: "val" }, {}, LOCAL);
      assert.equal(exitCode, 0);
    })
  );

  assert.equal(out, "ok\n");
  assert.deepEqual(rpcSequence(calls), [
    "initialize",
    "notifications/initialized",
    "tools/call",
    "DELETE",
  ]);
  const toolCall = calls[2];
  assert.equal(toolCall.body?.params?.name, "omniroute_get_health");
  assert.deepEqual(toolCall.body?.params?.arguments, { key: "val" });
  for (const c of calls.slice(1)) {
    assert.equal(
      c.headers.get("mcp-session-id"),
      MCP_MOCK_SESSION_ID,
      `${c.method} must carry sid`
    );
  }
});

test("mcp call on a stateless server: no session header and no DELETE", async () => {
  const calls: McpFetchCall[] = [];
  const out = await withFetch(
    makeMcpStreamFetch({
      sessionMode: "stateless",
      toolResult: { content: [{ type: "text", text: "stateless-ok" }] },
      calls,
    }),
    () =>
      captureStdout(async () => {
        assert.equal(await runMcpCallCommand("omniroute_get_health", {}, {}, LOCAL), 0);
      })
  );

  assert.equal(out, "stateless-ok\n");
  assert.deepEqual(rpcSequence(calls), ["initialize", "notifications/initialized", "tools/call"]);
  for (const c of calls) assert.equal(c.headers.get("mcp-session-id"), null);
});

test("mcpCallTool never sends MCP-Protocol-Version (sessionful or stateless)", async () => {
  for (const sessionMode of ["session", "stateless"] as const) {
    const calls: McpFetchCall[] = [];
    await withFetch(makeMcpStreamFetch({ sessionMode, calls }), () => mcpCallTool("t", {}));
    assert.ok(calls.length >= 3);
    for (const c of calls) {
      assert.equal(c.headers.get("mcp-protocol-version"), null, `${sessionMode} ${c.method}`);
    }
  }
});

test("a failing notifications/initialized never fails the tool call", async () => {
  const failures: Array<() => Response> = [
    () => makeMcpResp({ error: "bad" }, 400),
    () => {
      throw new TypeError("fetch failed");
    },
  ];
  for (const fail of failures) {
    const calls: McpFetchCall[] = [];
    const result = await withFetch(
      makeMcpStreamFetch({
        calls,
        onRequest: (c) => (c.body?.method === "notifications/initialized" ? fail() : undefined),
      }),
      () => mcpCallTool("t", {})
    );
    assert.deepEqual(result, { content: [{ type: "text", text: "ok" }] });
    assert.equal(calls.filter((c) => c.body?.method === "tools/call").length, 1);
  }
});

// ---- mcp call: output ----

test("mcp call prints result content to stdout", async () => {
  const out = await withFetch(
    makeMcpStreamFetch({ toolResult: { content: [{ type: "text", text: "hello world" }] } }),
    () => captureStdout(async () => void (await runMcpCallCommand("test", {}, {}, LOCAL)))
  );
  assert.equal(out, "hello world\n");
});

test("mcp call with --stream prints every SSE data frame", async () => {
  const encoder = new TextEncoder();
  const out = await withFetch(
    makeMcpStreamFetch({
      onRequest: (c) => {
        if (c.body?.method !== "tools/call") return undefined;
        const body = new ReadableStream<Uint8Array>({
          start(controller) {
            controller.enqueue(encoder.encode("data: stream-chunk-1\n\ndata:stream-chunk-2\n\n"));
            controller.close();
          },
        });
        return new Response(body, { headers: { "content-type": "text/event-stream" } });
      },
    }),
    () =>
      captureStdout(async () => {
        assert.equal(await runMcpCallCommand("test", {}, { stream: true }, LOCAL), 0);
      })
  );
  assert.equal(out, "stream-chunk-1\nstream-chunk-2\n");
});

test("--stream reads the whole SSE body before DELETE ends the session", async () => {
  // A sessionful server closes the session's open streams on DELETE (OmniRoute's
  // httpTransport does transport.close()). If the client sent DELETE as soon as
  // response headers arrived, everything after the first frame would be lost.
  const encoder = new TextEncoder();
  let controller: ReadableStreamDefaultController<Uint8Array> | null = null;
  let finished = false;
  let deleteBeforeEnd = false;
  const calls: McpFetchCall[] = [];

  const out = await withFetch(
    makeMcpStreamFetch({
      calls,
      onRequest: (c) => {
        if (c.method === "DELETE") {
          if (!finished) {
            deleteBeforeEnd = true;
            controller?.close();
          }
          return undefined;
        }
        if (c.body?.method !== "tools/call") return undefined;
        const body = new ReadableStream<Uint8Array>({
          start(ctrl) {
            controller = ctrl;
            ctrl.enqueue(encoder.encode('data: {"method":"notifications/message"}\n\n'));
            setTimeout(() => {
              if (deleteBeforeEnd) return;
              ctrl.enqueue(encoder.encode('data: {"id":2,"result":"final"}\n\n'));
              finished = true;
              ctrl.close();
            }, 20);
          },
        });
        return new Response(body, { headers: { "content-type": "text/event-stream" } });
      },
    }),
    () =>
      captureStdout(async () => {
        assert.equal(await runMcpCallCommand("chatty", {}, { stream: true }, LOCAL), 0);
      })
  );

  assert.equal(deleteBeforeEnd, false, "DELETE must wait for the stream to finish");
  assert.match(out, /"result":"final"/);
  assert.equal(rpcSequence(calls).at(-1), "DELETE");
});

// ---- mcp call: retries and timeout ----

test("tools/call is never retried: a 503 runs the tool once and fails", async () => {
  const calls: McpFetchCall[] = [];
  const { stdout, stderr } = await withFetch(
    makeMcpStreamFetch({
      calls,
      onRequest: (c) =>
        c.body?.method === "tools/call" ? makeMcpResp({ error: "busy" }, 503) : undefined,
    }),
    () =>
      captureStdio(async () => {
        assert.equal(await runMcpCallCommand("omniroute_memory_add", {}, {}, LOCAL), 1);
      })
  );
  assert.equal(calls.filter((c) => c.body?.method === "tools/call").length, 1);
  assert.equal(stdout, "");
  assert.match(stderr, /^MCP tools\/call failed: HTTP 503/);
  assert.equal(rpcSequence(calls).at(-1), "DELETE", "session is still torn down");
});

test(
  "mcp call honours the global --timeout and does not replay a timed-out tools/call",
  { timeout: 10_000 },
  async () => {
    const calls: McpFetchCall[] = [];
    const started = Date.now();
    const { stderr } = await withFetch(
      makeMcpStreamFetch({
        calls,
        onRequest: (c) => {
          if (c.body?.method !== "tools/call") return undefined;
          // A tool that never answers: only the client-side timeout ends it.
          return new Promise<Response>((_, reject) => {
            c.signal?.addEventListener("abort", () =>
              reject(new DOMException("This operation was aborted", "AbortError"))
            );
          });
        },
      }),
      () =>
        captureStdio(async () => {
          // commander hands global options over as strings
          assert.equal(await runMcpCallCommand("slow", {}, {}, { ...LOCAL, timeout: "50" }), 1);
        })
    );
    assert.ok(Date.now() - started < 5_000, "the 50ms --timeout must apply, not the 30s default");
    assert.equal(calls.filter((c) => c.body?.method === "tools/call").length, 1);
    assert.match(stderr, /^MCP tools\/call timed out after 50ms/);
  }
);

// A tools/call that never answers: only a client-side deadline ends it.
function hangingToolCall(calls?: McpFetchCall[]) {
  return makeMcpStreamFetch({
    calls,
    onRequest: (c) =>
      c.body?.method !== "tools/call"
        ? undefined
        : new Promise<Response>((_, reject) => {
            c.signal?.addEventListener("abort", () =>
              reject(new DOMException("This operation was aborted", "AbortError"))
            );
          }),
  });
}

async function withHttpTimeoutEnv<T>(value: string | undefined, fn: () => Promise<T>): Promise<T> {
  const prev = process.env.OMNIROUTE_HTTP_TIMEOUT_MS;
  if (value === undefined) delete process.env.OMNIROUTE_HTTP_TIMEOUT_MS;
  else process.env.OMNIROUTE_HTTP_TIMEOUT_MS = value;
  try {
    return await fn();
  } finally {
    if (prev === undefined) delete process.env.OMNIROUTE_HTTP_TIMEOUT_MS;
    else process.env.OMNIROUTE_HTTP_TIMEOUT_MS = prev;
  }
}

// Drives the real commander program (global --timeout default and all), so the
// action's default-stripping is covered, not just runMcpCallCommand.
async function runCli(
  argv: string[],
  fetchImpl: typeof globalThis.fetch = hangingToolCall()
): Promise<{ code: number; ms: number; stderr: string }> {
  const prevExit = process.exit;
  let code = 0;
  process.exit = ((c?: number) => {
    code = c ?? 0;
    throw new Error("__exit__");
  }) as typeof process.exit;
  const started = Date.now();
  try {
    const { stderr } = await withFetch(fetchImpl, () =>
      captureStdio(async () => {
        try {
          await createProgram().parseAsync(["--base-url", LOCAL.baseUrl, ...argv], {
            from: "user",
          });
        } catch (err) {
          if ((err as Error).message !== "__exit__") throw err;
        }
      })
    );
    return { code, ms: Date.now() - started, stderr };
  } finally {
    process.exit = prevExit;
  }
}

test("resolveMcpCallTimeoutMs: canonical integers only, 0 = unlimited, huge values clamped", () => {
  assert.deepEqual(resolveMcpCallTimeoutMs(undefined), { timeout: undefined, invalid: false });
  assert.deepEqual(resolveMcpCallTimeoutMs("50"), { timeout: 50, invalid: false });
  assert.deepEqual(resolveMcpCallTimeoutMs(50), { timeout: 50, invalid: false });
  assert.deepEqual(resolveMcpCallTimeoutMs("10"), { timeout: 10, invalid: false });
  assert.deepEqual(resolveMcpCallTimeoutMs("0"), { timeout: 0, invalid: false });
  assert.deepEqual(resolveMcpCallTimeoutMs(0), { timeout: 0, invalid: false });
  const invalid = [
    ...["", " ", "\t", "abc", "-1", "+5", "300ms", "1e3", "0.5", "0x10"],
    // Only exactly "0" disables the deadline: no leading zeros, no surrounding whitespace.
    ...["00", "007", "0050", " 0 ", " 0", "0 ", "\n0", " 50 ", "50\n"],
    ...[Number.NaN, -5],
  ];
  for (const raw of invalid) {
    assert.deepEqual(
      resolveMcpCallTimeoutMs(raw),
      { timeout: undefined, invalid: true },
      `${JSON.stringify(String(raw))} must be invalid`
    );
  }
  assert.equal(MAX_TIMEOUT_MS, 2_147_483_647);
  for (const raw of ["2147483647", "2147483648", "99999999999"]) {
    assert.deepEqual(resolveMcpCallTimeoutMs(raw), { timeout: MAX_TIMEOUT_MS, invalid: false });
  }
});

test("CLI: OMNIROUTE_HTTP_TIMEOUT_MS applies when --timeout is omitted", { timeout: 5_000 }, () =>
  withHttpTimeoutEnv("60", async () => {
    const r = await runCli(["mcp", "call", "slow"]);
    assert.equal(r.code, 1);
    assert.ok(r.ms < 3_000, `env timeout must apply, took ${r.ms}ms`);
    assert.match(r.stderr, /^MCP tools\/call timed out after 60ms/);
  })
);

test("CLI: an explicit --timeout beats OMNIROUTE_HTTP_TIMEOUT_MS", { timeout: 5_000 }, () =>
  withHttpTimeoutEnv("60000", async () => {
    const r = await runCli(["--timeout", "60", "mcp", "call", "slow"]);
    assert.equal(r.code, 1);
    assert.ok(r.ms < 3_000, `--timeout 60 must apply, took ${r.ms}ms`);
  })
);

test(
  "invalid or blank --timeout warns and falls back to OMNIROUTE_HTTP_TIMEOUT_MS",
  { timeout: 10_000 },
  () =>
    withHttpTimeoutEnv("60", async () => {
      for (const raw of ["abc", " ", "", "00", " 0 "]) {
        const calls: McpFetchCall[] = [];
        const started = Date.now();
        const { stderr } = await withFetch(hangingToolCall(calls), () =>
          captureStdio(async () => {
            assert.equal(await runMcpCallCommand("slow", {}, {}, { ...LOCAL, timeout: raw }), 1);
          })
        );
        const ms = Date.now() - started;
        assert.ok(
          ms < 3_000,
          `${JSON.stringify(raw)} must fall back to the 60ms env, took ${ms}ms`
        );
        assert.ok(
          stderr.startsWith(`Warning: invalid --timeout ${JSON.stringify(raw)};`),
          `missing warning for ${JSON.stringify(raw)}: ${stderr}`
        );
        assert.equal(calls.filter((c) => c.body?.method === "tools/call").length, 1);
      }
    })
);

test(
  "CLI: blank --timeout warns and falls back to OMNIROUTE_HTTP_TIMEOUT_MS",
  { timeout: 5_000 },
  () =>
    withHttpTimeoutEnv("60", async () => {
      const r = await runCli(["--timeout", " ", "mcp", "call", "slow"]);
      assert.equal(r.code, 1);
      assert.ok(r.ms < 3_000, `blank --timeout must not mean unlimited, took ${r.ms}ms`);
      assert.equal(
        r.stderr.split("\n")[0],
        'Warning: invalid --timeout " "; ignoring it (tools/call: 60ms, initialize: 60ms per attempt).'
      );
    })
);

test("--timeout 0 means no client-side deadline on tools/call", async () => {
  const calls: McpFetchCall[] = [];
  const { stderr } = await withFetch(makeMcpStreamFetch({ calls }), () =>
    captureStdio(async () => {
      assert.equal(
        await runMcpCallCommand("omniroute_get_health", {}, {}, { ...LOCAL, timeout: "0" }),
        0
      );
    })
  );
  assert.equal(stderr, "", "0 is valid: no warning");
  const toolCall = calls.find((c) => c.body?.method === "tools/call");
  assert.ok(toolCall, "tools/call must have been sent");
  assert.equal(toolCall.signal, null, "timeout 0 must not attach an AbortSignal");
});

test("--timeout above setTimeout's limit is clamped, not turned into a 1ms abort", async () => {
  const calls: McpFetchCall[] = [];
  const { stdout, stderr } = await withFetch(makeMcpStreamFetch({ calls }), () =>
    captureStdio(async () => {
      assert.equal(
        await runMcpCallCommand(
          "omniroute_get_health",
          {},
          {},
          { ...LOCAL, timeout: "99999999999" }
        ),
        0
      );
    })
  );
  assert.equal(stdout, "ok\n");
  assert.equal(stderr, "");
  const toolCall = calls.find((c) => c.body?.method === "tools/call");
  assert.ok(toolCall?.signal, "a clamped timeout still attaches a deadline");
  assert.equal(toolCall.signal.aborted, false);
  assert.equal(
    calls.filter((c) => c.body?.method === "initialize").length,
    1,
    "no abort → no retry"
  );
});

test("resolveMcpCallTimeouts: flag, else env, else 30s handshake and no tools/call deadline", () => {
  const ok = (handshake: number, toolCall: number) => ({ handshake, toolCall, warnings: [] });
  assert.equal(DEFAULT_HANDSHAKE_TIMEOUT_MS, 30_000);
  assert.deepEqual(resolveMcpCallTimeouts("50", "60"), ok(50, 50));
  assert.deepEqual(resolveMcpCallTimeouts("0", "60"), ok(0, 0), "--timeout 0 stays unlimited");
  assert.deepEqual(resolveMcpCallTimeouts(undefined, "60"), ok(60, 60));
  for (const env of [undefined, "", "0"]) {
    assert.deepEqual(resolveMcpCallTimeouts(undefined, env), ok(30_000, 0), `env ${env}`);
  }
  assert.deepEqual(
    resolveMcpCallTimeouts(undefined, "99999999999"),
    ok(MAX_TIMEOUT_MS, MAX_TIMEOUT_MS)
  );
  // The env value is parsed like the flag: "300ms" is rejected, not read as 300.
  for (const env of ["300ms", "abc", "-5", " 60 ", "1e3", "00"]) {
    assert.deepEqual(resolveMcpCallTimeouts(undefined, env), {
      handshake: 30_000,
      toolCall: 0,
      warnings: [`invalid OMNIROUTE_HTTP_TIMEOUT_MS ${JSON.stringify(env)}`],
    });
  }
  assert.deepEqual(resolveMcpCallTimeouts("300ms", "60"), {
    handshake: 60,
    toolCall: 60,
    warnings: ['invalid --timeout "300ms"'],
  });
});

test(
  "CLI: OMNIROUTE_HTTP_TIMEOUT_MS=300ms warns and is ignored, like --timeout 300ms",
  { timeout: 10_000 },
  () =>
    withHttpTimeoutEnv("300ms", async () => {
      // Both initialize and tools/call take 500ms: read as 300 they would time out.
      const fetchImpl = makeMcpStreamFetch({
        onRequest: async (c) => {
          if (c.body?.method === "initialize" || c.body?.method === "tools/call") await delay(500);
          return undefined;
        },
      });
      const r = await runCli(["mcp", "call", "omniroute_get_health"], fetchImpl);
      assert.equal(r.code, 0, r.stderr);
      assert.equal(
        r.stderr.split("\n")[0],
        'Warning: invalid OMNIROUTE_HTTP_TIMEOUT_MS "300ms"; ignoring it ' +
          "(tools/call: no limit, initialize: 30000ms per attempt)."
      );
    })
);

test("other mcpCallTool callers keep apiFetch's deadline on tools/call, as before", () =>
  withHttpTimeoutEnv(undefined, async () => {
    // combo / compression / oneproxy / resilience / skills pass no toolCallTimeout:
    // tools/call keeps OMNIROUTE_HTTP_TIMEOUT_MS-else-30s, or their explicit timeout.
    // toolCallTimeout: undefined counts as not set.
    for (const options of [{}, { timeout: 30000 }, { toolCallTimeout: undefined }]) {
      const calls: McpFetchCall[] = [];
      await withFetch(makeMcpStreamFetch({ calls }), () =>
        mcpCallTool("omniroute_get_health", {}, { ...LOCAL, ...options })
      );
      const toolCall = calls.find((c) => c.body?.method === "tools/call");
      assert.ok(toolCall?.signal, `tools/call must keep a deadline for ${JSON.stringify(options)}`);
    }
  }));

// Let pending promise callbacks run between fake-timer ticks.
const settle = () => new Promise<void>((resolve) => setImmediate(resolve));
const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

test(
  "CLI: with no --timeout and no env, tools/call has no deadline but the handshake does",
  { timeout: 10_000 },
  () =>
    withHttpTimeoutEnv(undefined, async () => {
      const calls: McpFetchCall[] = [];
      const r = await runCli(
        ["mcp", "call", "omniroute_get_health"],
        makeMcpStreamFetch({ calls })
      );
      assert.equal(r.code, 0, r.stderr);
      const byMethod = (m: string) => calls.find((c) => c.body?.method === m);
      assert.equal(byMethod("tools/call")?.signal, null, "tools/call must not get a deadline");
      assert.ok(byMethod("initialize")?.signal, "initialize keeps apiFetch's deadline");
      assert.ok(byMethod("notifications/initialized")?.signal);
      assert.ok(calls.find((c) => c.method === "DELETE")?.signal, "DELETE keeps its 3s deadline");
    })
);

test(
  "CLI: a tools/call slower than 30s still succeeds by default (fake timers)",
  { timeout: 10_000 },
  () =>
    withHttpTimeoutEnv(undefined, async () => {
      mock.timers.enable({ apis: ["setTimeout"] });
      try {
        let answer: (() => void) | undefined;
        const calls: McpFetchCall[] = [];
        const fetchImpl = makeMcpStreamFetch({
          calls,
          onRequest: (c) =>
            c.body?.method !== "tools/call"
              ? undefined
              : new Promise<Response>((resolve, reject) => {
                  c.signal?.addEventListener("abort", () =>
                    reject(new DOMException("This operation was aborted", "AbortError"))
                  );
                  answer = () => resolve(jsonRpcSse(c.body?.id, { result: { content: [] } }));
                }),
        });
        const pending = runCli(["mcp", "call", "slow"], fetchImpl);
        while (!answer) await settle();
        mock.timers.tick(10 * 60_000);
        await settle();
        answer();
        const r = await pending;
        assert.equal(r.code, 0, r.stderr);
        assert.equal(calls.filter((c) => c.body?.method === "tools/call").length, 1);
      } finally {
        mock.timers.reset();
      }
    })
);

test(
  "CLI: an explicit --timeout still aborts a slow tools/call (fake timers)",
  { timeout: 10_000 },
  () =>
    withHttpTimeoutEnv(undefined, async () => {
      mock.timers.enable({ apis: ["setTimeout"] });
      try {
        const calls: McpFetchCall[] = [];
        const pending = runCli(
          ["--timeout", "30000", "mcp", "call", "slow"],
          hangingToolCall(calls)
        );
        while (!calls.some((c) => c.body?.method === "tools/call")) await settle();
        const toolCall = calls.find((c) => c.body?.method === "tools/call");
        mock.timers.tick(29_999);
        await settle();
        assert.equal(toolCall?.signal?.aborted, false);
        mock.timers.tick(1);
        const r = await pending;
        assert.equal(r.code, 1);
        assert.match(r.stderr, /^MCP tools\/call timed out after 30000ms/);
      } finally {
        mock.timers.reset();
      }
    })
);

// tools/call answers with SSE headers at once, then stays silent until the
// client gives up: a headers-only timer would never fire here.
function silentSseToolCall(calls: McpFetchCall[], sessionMode: "session" | "stateless") {
  return makeMcpStreamFetch({
    calls,
    sessionMode,
    onRequest: (c) => {
      if (c.body?.method !== "tools/call") return undefined;
      const body = new ReadableStream<Uint8Array>({
        start(controller) {
          controller.enqueue(new TextEncoder().encode(": keepalive\n\n"));
          c.signal?.addEventListener("abort", () => controller.error(c.signal?.reason));
        },
      });
      return new Response(body, { headers: { "content-type": "text/event-stream" } });
    },
  });
}

for (const stream of [false, true]) {
  test(
    `an explicit --timeout limits the whole tools/call, body included (stream=${stream})`,
    { timeout: 10_000 },
    async () => {
      const calls: McpFetchCall[] = [];
      const started = Date.now();
      const { stdout, stderr } = await withFetch(silentSseToolCall(calls, "session"), () =>
        captureStdio(async () => {
          assert.equal(
            await runMcpCallCommand("slow", {}, { stream }, { ...LOCAL, timeout: "100" }),
            1
          );
        })
      );
      assert.ok(Date.now() - started < 3_000, "the deadline must fire while the body is pending");
      assert.equal(stdout, "");
      assert.match(stderr, /^MCP tools\/call timed out after 100ms/);
      assert.equal(calls.filter((c) => c.body?.method === "tools/call").length, 1, "no retry");
      // Best-effort cancel for the timed-out request, then the usual DELETE.
      const cancel = calls.find((c) => c.body?.method === "notifications/cancelled");
      assert.deepEqual(cancel?.body?.params?.requestId, 2);
      assert.equal(cancel?.headers.get("mcp-session-id"), MCP_MOCK_SESSION_ID);
      assert.deepEqual(rpcSequence(calls).slice(-2), ["notifications/cancelled", "DELETE"]);
    }
  );
}

test(
  "a stateless server gets no notifications/cancelled after a timeout",
  { timeout: 10_000 },
  async () => {
    const calls: McpFetchCall[] = [];
    await withFetch(silentSseToolCall(calls, "stateless"), () =>
      captureStdio(async () => {
        assert.equal(await runMcpCallCommand("slow", {}, {}, { ...LOCAL, timeout: "100" }), 1);
      })
    );
    assert.ok(!calls.some((c) => c.body?.method === "notifications/cancelled"));
    assert.ok(!calls.some((c) => c.method === "DELETE"));
  }
);

test("CLI: initialize keeps the 30s default deadline (fake timers)", { timeout: 10_000 }, () =>
  withHttpTimeoutEnv(undefined, async () => {
    mock.timers.enable({ apis: ["setTimeout"] });
    try {
      const calls: McpFetchCall[] = [];
      let initializeSeen = 0;
      const fetchImpl = makeMcpStreamFetch({
        calls,
        onRequest: (c) => {
          if (c.body?.method !== "initialize" || ++initializeSeen > 1) return undefined;
          // First initialize hangs until the client-side deadline aborts it.
          return new Promise<Response>((_, reject) => {
            c.signal?.addEventListener("abort", () =>
              reject(new DOMException("This operation was aborted", "AbortError"))
            );
          });
        },
      });
      const pending = runCli(["mcp", "call", "omniroute_get_health"], fetchImpl);
      while (initializeSeen < 1) await settle();
      const first = calls.find((c) => c.body?.method === "initialize");
      mock.timers.tick(29_999);
      await settle();
      assert.equal(first?.signal?.aborted, false, "not before 30s");
      mock.timers.tick(1);
      await settle();
      assert.equal(first?.signal?.aborted, true, "aborted at 30s");
      // apiFetch retries the initialize after a backoff; let it finish.
      let done = false;
      void pending.then(() => (done = true));
      while (!done) {
        mock.timers.tick(1_000);
        await settle();
      }
      const r = await pending;
      assert.equal(r.code, 0, r.stderr);
      assert.equal(initializeSeen, 2);
    } finally {
      mock.timers.reset();
    }
  })
);

test(
  "a finished tools/call clears its deadline, so the CLI can exit at once (fake timers)",
  { timeout: 10_000 },
  () =>
    withHttpTimeoutEnv(undefined, async () => {
      mock.timers.enable({ apis: ["setTimeout"] });
      try {
        const calls: McpFetchCall[] = [];
        const r = await runCli(
          ["--timeout", "600000", "mcp", "call", "omniroute_get_health"],
          makeMcpStreamFetch({ calls })
        );
        assert.equal(r.code, 0, r.stderr);
        const toolCall = calls.find((c) => c.body?.method === "tools/call");
        assert.ok(toolCall?.signal, "the explicit --timeout attaches a deadline");
        // A deadline timer left running would fire here, and in a real process it
        // would keep the CLI alive for the full 600s after printing the result.
        mock.timers.tick(600_000);
        await settle();
        assert.equal(toolCall.signal.aborted, false);
      } finally {
        mock.timers.reset();
      }
    })
);

test(
  "notifications/cancelled is sent only when the deadline expires, not on other errors",
  { timeout: 10_000 },
  async () => {
    const failures: Array<() => Promise<Response>> = [
      async () => makeMcpResp({ error: "unavailable" }, 503),
      async () => {
        throw new TypeError("fetch failed");
      },
      async () => jsonRpcSse(2, { error: { code: -32000, message: "boom" } }),
    ];
    for (const fail of failures) {
      const calls: McpFetchCall[] = [];
      await withFetch(
        makeMcpStreamFetch({
          calls,
          onRequest: (c) => (c.body?.method === "tools/call" ? fail() : undefined),
        }),
        () =>
          captureStdio(async () => {
            assert.equal(
              await runMcpCallCommand("slow", {}, {}, { ...LOCAL, timeout: "60000" }),
              1
            );
          })
      );
      assert.deepEqual(rpcSequence(calls).slice(-2), ["tools/call", "DELETE"]);
    }
  }
);

test(
  "a hanging notifications/cancelled is dropped after CANCEL_NOTIFY_TIMEOUT_MS",
  { timeout: 10_000 },
  async () => {
    assert.equal(CANCEL_NOTIFY_TIMEOUT_MS, 1000);
    const calls: McpFetchCall[] = [];
    let cancelSentAt = 0;
    let cancelAbortedAfterMs: number | null = null;
    const fetchImpl = makeMcpStreamFetch({
      calls,
      onRequest: (c) => {
        if (c.body?.method === "tools/call") return hangUntilAborted(c);
        if (c.body?.method !== "notifications/cancelled") return undefined;
        cancelSentAt = Date.now();
        c.signal?.addEventListener("abort", () => {
          cancelAbortedAfterMs = Date.now() - cancelSentAt;
        });
        return hangUntilAborted(c);
      },
    });
    await withFetch(fetchImpl, () =>
      captureStdio(async () => {
        assert.equal(await runMcpCallCommand("slow", {}, {}, { ...LOCAL, timeout: "100" }), 1);
      })
    );
    assert.ok(cancelAbortedAfterMs != null, "the cancel must be cut off by its own timeout");
    assert.ok(
      cancelAbortedAfterMs >= CANCEL_NOTIFY_TIMEOUT_MS - 200 &&
        cancelAbortedAfterMs < CANCEL_NOTIFY_TIMEOUT_MS + 1_000,
      `cancel aborted after ${cancelAbortedAfterMs}ms; expected ~${CANCEL_NOTIFY_TIMEOUT_MS}ms`
    );
    assert.equal(rpcSequence(calls).at(-1), "DELETE");
  }
);

test(
  "the tools/call deadline starts after the handshake, not before",
  { timeout: 10_000 },
  async () => {
    // initialize takes 700ms, tools/call 300ms; a 500ms deadline covers only tools/call.
    const { stdout, stderr } = await withFetch(
      makeMcpStreamFetch({
        onRequest: async (c) => {
          if (c.body?.method === "initialize") await delay(700);
          if (c.body?.method === "tools/call") await delay(300);
          return undefined;
        },
      }),
      () =>
        captureStdio(async () => {
          assert.equal(
            await runMcpCallCommand("omniroute_get_health", {}, {}, { ...LOCAL, timeout: "500" }),
            0
          );
        })
    );
    assert.equal(stdout, "ok\n");
    assert.equal(stderr, "");
  }
);

function hangUntilAborted(c: McpFetchCall) {
  return new Promise<Response>((_, reject) => {
    c.signal?.addEventListener("abort", () =>
      reject(new DOMException("This operation was aborted", "AbortError"))
    );
  });
}

test("apiFetch: the caller's signal aborts a request that also has a timeout", async () => {
  const ac = new AbortController();
  let seen: AbortSignal | null = null;
  const fetchImpl = (async (_input: FetchInputLike, init?: RequestInit) => {
    seen = init?.signal ?? null;
    return new Promise<Response>((_, reject) => {
      init?.signal?.addEventListener("abort", () => reject(init.signal?.reason));
    });
  }) as typeof globalThis.fetch;
  await withFetch(fetchImpl, async () => {
    const pending = apiFetch("/api/x", {
      ...LOCAL,
      timeout: 60_000,
      retry: false,
      signal: ac.signal,
    });
    while (!seen) await settle();
    ac.abort(new Error("caller stopped"));
    await assert.rejects(pending, /caller stopped/);
  });
});

test("apiFetch: no retry once the caller's signal is aborted", async () => {
  for (const timeout of [0, 60_000]) {
    const ac = new AbortController();
    ac.abort(); // default AbortError reason, which would otherwise be retried
    let attempts = 0;
    const fetchImpl = (async (_input: FetchInputLike, init?: RequestInit) => {
      attempts++;
      throw init?.signal?.reason;
    }) as typeof globalThis.fetch;
    await withFetch(fetchImpl, () =>
      assert.rejects(apiFetch("/api/x", { ...LOCAL, timeout, signal: ac.signal }))
    );
    assert.equal(attempts, 1, `timeout ${timeout}`);
  }
});

type FetchInputLike = string | URL | Request;

test(
  "session DELETE uses SESSION_DELETE_TIMEOUT_MS even when --timeout is larger",
  { timeout: 20_000 },
  async () => {
    assert.equal(SESSION_DELETE_TIMEOUT_MS, 3000);
    const calls: McpFetchCall[] = [];
    let deleteAbortAfterMs: number | null = null;
    const started = Date.now();
    const { stdout, stderr } = await withFetch(
      makeMcpStreamFetch({
        calls,
        onRequest: (c) => {
          if (c.method !== "DELETE") return undefined;
          // Never answers: only the DELETE short timeout may end it.
          return new Promise<Response>((_, reject) => {
            c.signal?.addEventListener("abort", () => {
              deleteAbortAfterMs = Date.now() - started;
              reject(new DOMException("This operation was aborted", "AbortError"));
            });
          });
        },
      }),
      () =>
        captureStdio(async () => {
          // A large --timeout must not stretch session teardown.
          assert.equal(
            await runMcpCallCommand("omniroute_get_health", {}, {}, { ...LOCAL, timeout: "60000" }),
            0
          );
        })
    );
    assert.equal(stdout, "ok\n");
    assert.equal(stderr, "");
    assert.ok(deleteAbortAfterMs != null, "DELETE must be aborted by its short timeout");
    // Measured 3000–3007ms under load; +1s still catches any other DELETE deadline.
    assert.ok(
      deleteAbortAfterMs >= SESSION_DELETE_TIMEOUT_MS - 500 &&
        deleteAbortAfterMs < SESSION_DELETE_TIMEOUT_MS + 1_000,
      `DELETE aborted at ${deleteAbortAfterMs}ms; expected ~${SESSION_DELETE_TIMEOUT_MS}ms`
    );
    assert.ok(Date.now() - started < SESSION_DELETE_TIMEOUT_MS + 1_000);
    assert.equal(rpcSequence(calls).at(-1), "DELETE");
  }
);

// ---- error contract ----

test("JSON-RPC error → 'MCP error: <message>' with err.code", async () => {
  const fetchImpl = makeMcpStreamFetch({
    onRequest: (c) =>
      c.body?.method === "tools/call"
        ? jsonRpcSse(c.body.id, { error: { code: -32602, message: "Tool nope not found" } })
        : undefined,
  });

  await withFetch(fetchImpl, () =>
    assert.rejects(mcpCallTool("nope", {}), (err: Error & { code?: number; status?: number }) => {
      assert.equal(err.message, "MCP error: Tool nope not found");
      assert.equal(err.code, -32602);
      assert.equal(err.status, undefined);
      return true;
    })
  );

  const { stdout, stderr } = await withFetch(fetchImpl, () =>
    captureStdio(async () => {
      assert.equal(await runMcpCallCommand("nope", {}, {}, LOCAL), 1);
    })
  );
  assert.equal(stdout, "");
  assert.equal(stderr, "MCP error: Tool nope not found\n");
});

test("result.isError → 'MCP error: <text>' with err.status 500, exit 1", async () => {
  const fetchImpl = makeMcpStreamFetch({
    toolResult: { isError: true, content: [{ type: "text", text: "boom" }] },
  });

  await withFetch(fetchImpl, () =>
    assert.rejects(mcpCallTool("fails", {}), (err: Error & { code?: number; status?: number }) => {
      assert.equal(err.message, "MCP error: boom");
      assert.equal(err.status, 500);
      assert.equal(err.code, undefined);
      return true;
    })
  );

  const { stdout, stderr } = await withFetch(fetchImpl, () =>
    captureStdio(async () => {
      assert.equal(await runMcpCallCommand("fails", {}, {}, LOCAL), 1);
    })
  );
  assert.equal(stdout, "");
  assert.equal(stderr, "MCP error: boom\n");
});

test("HTTP error → 'MCP <method> failed: HTTP <status> — <body>' with err.status, no further RPCs", async () => {
  const calls: McpFetchCall[] = [];
  const fetchImpl = makeMcpStreamFetch({
    calls,
    onRequest: (c) =>
      c.body?.method === "initialize" ? makeMcpResp("Invalid management token", 401) : undefined,
  });

  await withFetch(fetchImpl, () =>
    assert.rejects(mcpCallTool("t", {}), (err: Error & { status?: number }) => {
      assert.equal(err.message, "MCP initialize failed: HTTP 401 — Invalid management token");
      assert.equal(err.status, 401);
      return true;
    })
  );
  assert.deepEqual(rpcSequence(calls), ["initialize"]);

  const { stderr } = await withFetch(fetchImpl, () =>
    captureStdio(async () => {
      assert.equal(await runMcpCallCommand("t", {}, {}, LOCAL), 1);
    })
  );
  assert.equal(stderr, "MCP initialize failed: HTTP 401 — Invalid management token\n");
});

test("mcp call prints an error and exits 1 on a non-ok tools/call", async () => {
  const { stderr } = await withFetch(
    makeMcpStreamFetch({
      onRequest: (c) =>
        c.body?.method === "tools/call" ? makeMcpResp({ error: "tool not found" }, 500) : undefined,
    }),
    () =>
      captureStdio(async () => {
        assert.equal(await runMcpCallCommand("bad_tool", {}, {}, LOCAL), 1);
      })
  );
  assert.match(stderr, /^MCP tools\/call failed: HTTP 500 — \{"error":"tool not found"\}/);
});

// ---- connection options ----

test("mcp call sends every request to --base-url with the explicit --api-key", async () => {
  const calls: McpFetchCall[] = [];
  const baseUrl = "http://127.0.0.1:1";
  await withFetch(makeMcpStreamFetch({ calls }), () =>
    captureStdout(async () => {
      assert.equal(await runMcpCallCommand("t", {}, {}, { baseUrl, apiKey: "explicit-key" }), 0);
    })
  );
  assert.equal(calls.length, 4);
  for (const c of calls) {
    assert.equal(c.url, `${baseUrl}/api/mcp/stream`);
    assert.equal(c.headers.get("authorization"), "Bearer explicit-key");
  }
});

test("mcp call resolves --context to that context's base URL and token", async () => {
  const dataDir = process.env.DATA_DIR;
  assert.ok(dataDir, "tests run with an isolated DATA_DIR");
  const configFile = join(dataDir, "config.json");
  const savedBaseUrl = process.env.OMNIROUTE_BASE_URL;
  delete process.env.OMNIROUTE_BASE_URL;
  mkdirSync(dataDir, { recursive: true });
  writeFileSync(
    configFile,
    JSON.stringify({
      version: 1,
      currentContext: "default",
      contexts: {
        default: { baseUrl: "http://localhost:20128", apiKey: null },
        remote: { baseUrl: "https://remote.example.test", accessToken: "ctx-token" },
      },
    })
  );

  const calls: McpFetchCall[] = [];
  try {
    await withFetch(makeMcpStreamFetch({ calls }), () =>
      captureStdout(async () => {
        assert.equal(await runMcpCallCommand("t", {}, {}, { context: "remote" }), 0);
      })
    );
  } finally {
    rmSync(configFile, { force: true });
    if (savedBaseUrl !== undefined) process.env.OMNIROUTE_BASE_URL = savedBaseUrl;
  }

  assert.equal(calls.length, 4);
  for (const c of calls) {
    assert.equal(c.url, "https://remote.example.test/api/mcp/stream");
    assert.equal(c.headers.get("authorization"), "Bearer ctx-token");
  }
});

// ---- mcp status ----

test("mcp status reads online field", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = (async (_url: string | URL, _init?: unknown) => {
    const u = String(_url);
    if (u.includes("/api/health")) {
      return makeResp({ status: "ok" }) as any;
    }
    if (u.includes("/api/mcp/status")) {
      return makeResp({
        status: "online",
        online: true,
        transport: "stdio",
        enabled: true,
        toolsCount: 107,
      }) as any;
    }
    return makeResp({ error: "not found" }, 404) as any;
  }) as any;

  const output = await captureStdout(async () => {
    const { runMcpStatusCommand } = await import("../../bin/cli/commands/mcp.mjs");
    const exitCode = await runMcpStatusCommand({});
    assert.equal(exitCode, 0);
  });

  globalThis.fetch = origFetch;
  assert.ok(output.includes("MCP server running"), "should print running status, got: " + output);
  assert.ok(output.includes("107"), "should print toolsCount");
});

test("mcp status json mode prints full object", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    const u = String(url);
    if (u.includes("/api/health")) {
      return Promise.resolve(makeResp({ status: "ok" }, 200));
    }
    if (u.includes("/api/mcp/status")) {
      return Promise.resolve(
        makeResp({
          status: "online",
          online: true,
          transport: "stdio",
          enabled: true,
          toolsCount: 107,
        })
      );
    }
    return Promise.resolve(makeResp({ error: "not found" }, 404));
  }) as any;

  const output = await captureStdout(async () => {
    const { runMcpStatusCommand } = await import("../../bin/cli/commands/mcp.mjs");
    const exitCode = await runMcpStatusCommand({ json: true });
    assert.equal(exitCode, 0);
  });

  globalThis.fetch = origFetch;
  const parsed = JSON.parse(output.trim());
  assert.equal(parsed.online, true);
  assert.equal(parsed.toolsCount, 107);
});
