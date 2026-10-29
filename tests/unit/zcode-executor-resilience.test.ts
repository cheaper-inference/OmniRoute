/** ZCode executor tests for native quota refusals, cancellations, and shutdown. */
import test from "node:test";
import assert from "node:assert/strict";
import { createTempDataDir } from "../_setup/tempDataDir.ts";

const { cleanup } = createTempDataDir("omniroute-zcode-resilience-");

const NATIVE_QUOTA_MESSAGE =
  "[1310][Weekly/Monthly Limit Exhausted. Your limit will reset at 2026-10-24 02:06:22][20261023051631bc36141006ea4bd9]";
const CANCELLED_MESSAGE = "Model request was cancelled.";
const CANCELLED_CODE = "upstream_request_cancelled";
const CODING_PLAN_PROVIDER = "account:zai-individual-coding-plan";

/** The exact shape `isDraining()` reads (src/lib/gracefulShutdown.ts). */
function setDraining(shuttingDown: boolean) {
  globalThis.__omnirouteShutdown = { init: false, shuttingDown, activeRequests: 0 };
}

/**
 * Native app-server client stub: the given phase rejects with `error`, every
 * other native call succeeds.
 */
function stubClient(opts: {
  error: unknown;
  phase?: string;
  providerId?: string;
  onCall?: (method: string) => void;
}) {
  const phase = opts.phase ?? "generateWorkspaceText";
  const providerId = opts.providerId ?? CODING_PLAN_PROVIDER;
  return () => ({
    async start() {},
    async close() {},
    async call(_channel: string, method: string) {
      opts.onCall?.(method);
      if (method === phase) throw opts.error;
      if (method === "initialize") return { available: true };
      if (method === "getView") {
        return {
          providers: [
            { providerId, models: [{ modelId: "GLM-5.3-Flash", config: { enabled: true } }] },
          ],
        };
      }
      throw opts.error;
    },
  });
}

async function runTurn(
  error: unknown,
  opts: {
    phase?: string;
    providerId?: string;
    onCall?: (method: string) => void;
    signal?: AbortSignal;
  } = {}
) {
  const { ZcodeExecutor } = await import("../../open-sse/executors/zcode.ts");
  const executor = new ZcodeExecutor({
    clientFactory: stubClient({ error, ...opts }),
    ...(opts.providerId ? { providerId: opts.providerId } : {}),
  });
  const result = await executor.execute({
    model: "glm-5.3-flash",
    body: {
      messages: [
        { role: "system", content: "You are a coding assistant." },
        { role: "user", content: "Reply with a short status." },
      ],
    },
    stream: false,
    credentials: {},
    ...(opts.signal ? { signal: opts.signal } : {}),
  });
  const response = "response" in result ? result.response : result;
  return { response, body: await response.json() };
}

test.beforeEach(() => setDraining(false));

test.after(async () => {
  delete globalThis.__omnirouteShutdown;
  await cleanup();
});

// ── B1: the native quota refusal keeps its exact native code ────────────────

test("ZCode native weekly/monthly quota refusal becomes a typed 429", async () => {
  const { response, body } = await runTurn(new Error(NATIVE_QUOTA_MESSAGE));
  assert.equal(response.status, 429);
  assert.equal(body.error.type, "rate_limit_error");
  assert.equal(body.error.code, "insufficient_quota");
  assert.equal(body.error.reason, "quota_exhausted");
  assert.ok(body.error.message.includes("Limit Exhausted"));
  assert.notEqual(body.error.code, CANCELLED_CODE, "a quota refusal is not a cancellation");
  assert.equal(body.notSubmitted, undefined);
  assert.equal(body.error.notSubmitted, undefined);
  assert.equal(body.admission, undefined);
});

test("ZCode UNKNOWN_ERROR envelope retains the exact native quota", async () => {
  const { response } = await runTurn(
    Object.assign(new Error(NATIVE_QUOTA_MESSAGE), { code: "UNKNOWN_ERROR" })
  );
  assert.equal(response.status, 429);
});

for (const message of [
  "ZCode Protocol runtime stopping",
  "HTTP 502 network failure",
  "HTTP 401 authentication failed",
  // A near-miss of the native refusal form.
  "[1310][Temporary rate limit]",
  // The refusal text quoted inside another message is not the refusal form.
  "user said [1310][Weekly/Monthly Limit Exhausted] in a previous turn",
]) {
  test(`ZCode does not relabel unrelated failure ${message}`, async () => {
    const { response, body } = await runTurn(new Error(message));
    assert.equal(response.status, 502);
    assert.equal(body.error.code, "bad_gateway");
    assert.notEqual(body.error.reason, "quota_exhausted");
    assert.notEqual(body.error.code, CANCELLED_CODE);
  });
}

test("ZCode quota text before model inference is not a trusted quota terminal", async () => {
  const { response } = await runTurn(new Error(NATIVE_QUOTA_MESSAGE), { phase: "initialize" });
  assert.equal(response.status, 502);
});

test("ZCode foreign provider quota text is not Coding Plan quota evidence", async () => {
  const { response } = await runTurn(new Error(NATIVE_QUOTA_MESSAGE), {
    providerId: "custom:foreign",
  });
  assert.equal(response.status, 502);
});

for (const detail of [
  { code: "AUTH_ERROR" },
  { code: "ECONNRESET" },
  { data: { status: 401 } },
  { data: { statusCode: 502 } },
]) {
  test(`ZCode contradictory native evidence remains nonquota ${JSON.stringify(detail)}`, async () => {
    const { response } = await runTurn(Object.assign(new Error(NATIVE_QUOTA_MESSAGE), detail));
    assert.equal(response.status, 502);
  });
}

test("ZCode aborted exact quota remains cancellation", async () => {
  const controller = new AbortController();
  const { response } = await runTurn(new Error(NATIVE_QUOTA_MESSAGE), {
    signal: controller.signal,
    onCall: (method) => {
      if (method === "generateWorkspaceText") controller.abort();
    },
  });
  assert.equal(response.status, 499);
});

// ── B2 + B4: an upstream cancellation is request-scoped and keeps its 502 ──

test("ZCode cancelled model request stays 502 and is tagged request-scoped", async () => {
  const { response, body } = await runTurn(new Error(CANCELLED_MESSAGE));
  assert.notEqual(response.status, 499, "a cancelled attempt must never stop the combo loop");
  assert.equal(response.status, 502, "the combo must be able to fall through to the next leg");
  assert.equal(body.error.code, CANCELLED_CODE);
  assert.equal(body.error.type, CANCELLED_CODE);
  assert.ok(body.error.message.includes(CANCELLED_MESSAGE));
});

for (const detail of [
  { code: "model_request_cancelled" },
  { code: "MODEL_REQUEST_CANCELLED" },
  { data: { code: "model_request_cancelled", message: CANCELLED_MESSAGE } },
]) {
  test(`ZCode structured cancellation is tagged request-scoped ${JSON.stringify(detail)}`, async () => {
    const { response, body } = await runTurn(
      Object.assign(new Error("native turn aborted"), detail)
    );
    assert.equal(response.status, 502);
    assert.equal(body.error.code, CANCELLED_CODE);
  });
}

for (const message of [
  // The ZCode server's transport-level abort (fetch DOMException) — NOT the
  // model-request cancellation.
  "Request was cancelled.",
  // The ZCode app-server cancelling the RPC itself.
  "ZCode RPC request canceled",
  // A genuine failure that merely mentions cancellation in another sense.
  "upstream cancelled the stream after 200 OK",
]) {
  test(`ZCode near-miss wording is not a cancellation: ${message}`, async () => {
    const { response, body } = await runTurn(new Error(message));
    assert.equal(response.status, 502);
    assert.notEqual(body.error.code, CANCELLED_CODE);
  });
}

// ── B4: our own shutdown drain answers 499, never 502 ──────────────────────

test("ZCode executor: a failure during shutdown drain is answered 499, not 502", async () => {
  setDraining(true);
  const { response, body } = await runTurn(new Error("ZCode Protocol client disposed"));
  assert.equal(response.status, 499, "a self-inflicted shutdown failure must not be a 502");
  assert.equal(body.error.type, "client_disconnected");
  assert.equal(body.error.code, "client_disconnected");
});

test("ZCode executor: the same failure outside a drain is still 502", async () => {
  setDraining(false);
  const { response, body } = await runTurn(new Error("ZCode Protocol client disposed"));
  assert.equal(response.status, 502, "a genuine upstream failure must stay a 502");
  assert.equal(body.error.type, "server_error");
});

test("ZCode executor: the drain verdict is not latched — it follows the live flag", async () => {
  setDraining(true);
  const duringDrain = await runTurn(new Error("ZCode Protocol client disposed"));
  assert.equal(duringDrain.response.status, 499);

  setDraining(false);
  const afterDrain = await runTurn(new Error("ZCode Protocol client disposed"));
  assert.equal(
    afterDrain.response.status,
    502,
    "a later failure must be classified as upstream again"
  );
});
