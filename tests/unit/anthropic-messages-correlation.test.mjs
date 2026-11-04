import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { transformSync } = require("esbuild");
const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

function transpile(file, requireModule) {
  const source = readFileSync(resolve(root, file), "utf8");
  const js = transformSync(source, { loader: "ts", format: "cjs", target: "node24" }).code;
  const mod = { exports: {} };
  new Function("module", "exports", "require", js)(mod, mod.exports, requireModule);
  return mod.exports;
}

const { resolveIncomingCorrelationId } = transpile(
  "src/shared/utils/correlationPreserve.ts",
  () => { throw new Error("Resolver should have no dependencies"); }
);

async function exercise({ correlationId = null, requestId = null, stream = false, simulatedSlowPath = false } = {}) {
  const traces = [];
  const keepalives = [];
  let nextId = 0;
  const generateRequestId = () => "omniroute-generated-" + (++nextId);
  const mocks = {
    "@/shared/services/bifrost/bifrostRouting.ts": {
      getBifrostRoutingConfig: () => null,
      resolveRelayRoutingBackend: () => "native",
      shouldTryBifrostForRequest: () => ({ tryBifrost: false }),
      getActiveBifrostCooldown: () => null,
      recordBifrostFailure: () => {},
      clearBifrostFailure: () => {},
      getRoutingFallbackHeader: () => null,
      getRoutingFallbackReasonHeader: () => null,
    },
    "@/shared/services/bifrost/bifrostClient.ts": {
      dispatchToBifrost: async () => { throw new Error("Sidecar should not be invoked in native-route tests"); },
    },
    "@/shared/services/bifrost/bifrostFastPathGate.ts": {
      gateBifrostFastPath: async () => ({ allow: false }),
    },
    "@/sse/handlers/chat": {
      handleChat: async (_request, _raw, body, correlation, signal) => {
        const effective = correlation || generateRequestId();
        traces.push({ supplied: correlation, effective, stream: body.stream, hasSignal: Boolean(signal) });
        return new Response('{"ok":true}', {
          status: 200,
          headers: { "x-correlation-id": effective, "x-request-id": "http-layer-id" },
        });
      },
    },
    "@/shared/utils/requestId": { generateRequestId },
    "@/shared/utils/correlationPreserve.ts": { resolveIncomingCorrelationId },
    "@omniroute/open-sse/translator/index.ts": { initTranslators: async () => {} },
    "@/middleware/promptInjectionGuard": { withInjectionGuard: handler => handler },
    "@/shared/middleware/withChatAdmission": { withChatAdmission: handler => handler },
    "@/shared/middleware/requireJsonContentType": { requireJsonContentType: () => null },
    "@/shared/utils/clientApiRouteAuth": { enforceClientApiRouteAuth: async () => null },
    "@omniroute/open-sse/utils/earlyStreamKeepalive": {
      ANTHROPIC_PING_FRAME: new Uint8Array(),
      withEarlyStreamKeepalive: async (reply, options) => {
        keepalives.push(options.correlationId);
        const original = await reply;
        if (simulatedSlowPath) {
          return new Response(original.body, {
            status: 200,
            headers: { "content-type": "text/event-stream", ...(options.extraHeaders ?? {}) },
          });
        }
        return original;
      },
    },
    "@omniroute/open-sse/utils/streamDeadlineSignal": {
      createStreamDeadlineSignal: () => ({
        signal: new AbortController().signal,
        deadlineController: {},
      }),
    },
    "@omniroute/open-sse/utils/keepaliveThreshold": { resolveKeepaliveThreshold: () => 1000 },
    "@omniroute/open-sse/utils/aiSdkCompat": { resolveStreamFlag: flag => flag === true },
  };
  const route = transpile("src/app/api/v1/messages/route.ts", name => {
    if (!Object.hasOwn(mocks, name)) throw new Error("Unknown module: " + name);
    return mocks[name];
  });

  const headers = { "content-type": "application/json" };
  if (correlationId !== null) headers["x-correlation-id"] = correlationId;
  if (requestId !== null) headers["x-request-id"] = requestId;
  const request = new Request("http://localhost:20128/api/v1/messages", {
    method: "POST",
    headers,
    body: JSON.stringify({ model: "auto/fast", stream, messages: [{ role: "user", content: "ping" }] }),
  });
  const response = await route.POST(request, null, null);
  return { traces, keepalives, response };
}

test("Anthropic non-streaming preserves a caller X-Correlation-Id", async () => {
  const x = await exercise({ correlationId: "caller-123" });
  assert.equal(x.traces.length, 1);
  assert.equal(x.traces[0].supplied, "caller-123");
  assert.equal(x.response.headers.get("x-correlation-id"), "caller-123");
  assert.equal(x.traces[0].hasSignal, false);
});

test("Anthropic non-streaming keeps X-Request-Id separate", async () => {
  const x = await exercise({ correlationId: "trace-id", requestId: "http-id" });
  assert.equal(x.traces[0].supplied, "trace-id");
  assert.equal(x.response.headers.get("x-request-id"), "http-layer-id");
  assert.equal(x.response.headers.get("x-correlation-id"), "trace-id");
});

test("Anthropic non-streaming falls back when caller correlation is absent", async () => {
  const x = await exercise({ requestId: "unrelated-http-id" });
  assert.equal(x.traces[0].supplied, undefined);
  assert.equal(x.response.headers.get("x-correlation-id"), "omniroute-generated-1");
});

test("Anthropic non-streaming rejects an overlong correlation", async () => {
  const x = await exercise({ correlationId: "a".repeat(257) });
  assert.equal(x.traces[0].supplied, undefined);
  assert.equal(x.response.headers.get("x-correlation-id"), "omniroute-generated-1");
});

test("Anthropic non-streaming preserves a sanitized caller correlation", async () => {
  const x = await exercise({ correlationId: "  trace-trim  " });
  assert.equal(x.traces[0].supplied, "trace-trim");
  assert.equal(x.response.headers.get("x-correlation-id"), "trace-trim");
});

test("Anthropic streaming forwards caller correlation to handler and keepalive", async () => {
  const x = await exercise({ correlationId: "stream-trace", stream: true });
  assert.equal(x.traces[0].supplied, "stream-trace");
  assert.equal(x.traces[0].hasSignal, true);
  assert.deepEqual(x.keepalives, ["stream-trace"]);
  assert.equal(x.response.headers.get("x-correlation-id"), "stream-trace");
});

test("Anthropic streaming generates one consistent correlation if absent", async () => {
  const x = await exercise({ stream: true });
  assert.equal(x.traces[0].supplied, "omniroute-generated-1");
  assert.deepEqual(x.keepalives, ["omniroute-generated-1"]);
  assert.equal(x.response.headers.get("x-correlation-id"), "omniroute-generated-1");
});

test("Anthropic slow-stream preserves caller correlation in synthetic response", async () => {
  const x = await exercise({ correlationId: "slow-caller-123", stream: true, simulatedSlowPath: true });
  assert.equal(x.response.headers.get("x-correlation-id"), "slow-caller-123");
});

test("Anthropic slow-stream preserves generated correlation in synthetic response", async () => {
  const x = await exercise({ stream: true, simulatedSlowPath: true });
  assert.equal(x.response.headers.get("x-correlation-id"), "omniroute-generated-1");
});

test("Resolver strips header injection attempts before use", () => {
  assert.equal(resolveIncomingCorrelationId("safe\r\nInjected: yes"), "safeInjected: yes");
  assert.equal(resolveIncomingCorrelationId("a".repeat(257)), null);
});
